import { BACKEND_IP } from "../constants";

const USE_MOCK = false; // Переключили на реальное API
const BASE_URL = `${BACKEND_IP}`;

/**
 * Универсальная функция запроса
 * @param {string} endpoint - Адрес ручки (напр. "/api/news/show")
 * @param {Object} options - Опции fetch (method, body, headers)
 * @param {boolean} isAuth - Если true, добавляет заголовок 'token'
 * @param {boolean} isFormData - Если true, отправляет данные как URLSearchParams
 */
async function request(endpoint, options = {}, isAuth = true, isFormData = false) {
    if (USE_MOCK) {
        return mockRequest(endpoint, options.body);
    }

    const headers = { ...options.headers };

    // 1. Добавляем токен, если нужно
    if (isAuth) {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Согласно спецификации, заголовок называется 'token', а не 'Authorization'
            headers["token"] = token;
        }
    }

    // 2. Устанавливаем Content-Type
    if (!headers["Content-Type"]) {
        if (isFormData) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
        } else {
            headers["Content-Type"] = "application/json";
        }
    }

    // 3. Подготавливаем тело запроса
    let body = options.body;
    if (body && !isFormData && typeof body !== 'string') {
        body = JSON.stringify(body);
    }

    const config = {
        method: options.method || "GET",
        headers,
        body
    };

    // 4. Выполняем запрос
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // 5. Обрабатываем ошибки
    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            // Игнорируем, если пришел не JSON
        }
        
        // Обработка ошибок валидации FastAPI (422)
        if (response.status === 422 && Array.isArray(errorData.detail)) {
            const msg = errorData.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join('; ');
            throw new Error(msg);
        }

        throw new Error(errorData.detail || errorData.message || `Ошибка ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

// ============================================================================
//                                 AUTH
// ============================================================================

/**
 * Вход пользователя (Login)
 * Endpoint: POST /api/auth/login
 * Content-Type: application/x-www-form-urlencoded
 */
export const loginUser = async (username, password) => {
    // OAuth2PasswordRequestForm требует данные в виде формы
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    return request("/api/auth/login", {
        method: "POST",
        body: formData
    }, false, true); // isAuth=false, isFormData=true
};

/**
 * Регистрация (Signup)
 * Endpoint: POST /api/auth/signup
 */
export const registerUser = async (name, email, password) => {
    return request("/api/auth/signup", {
        method: "POST",
        body: { name, email, password }
    }, false);
};

/**
 * Обновление токена (Refresh)
 * Endpoint: POST /api/auth/refresh
 * Param: token (в заголовке) - refresh токен
 */
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    // Спецификация требует передать refresh токен в заголовке 'token'
    return request("/api/auth/refresh", {
        method: "POST",
        headers: { "token": refreshToken } 
    }, false); // isAuth=false, так как мы вручную ставим заголовок
};

// ============================================================================
//                                 REWRITER
// ============================================================================

/**
 * Переписать текст (Rewrite)
 * Endpoint: POST /api/rewrite
 */
export const rewriteText = async (source, social = "VK", club_id = null) => {
    const payload = { source, social };
    if (club_id) payload.club_id = club_id;

    return request("/api/rewrite", {
        method: "POST",
        body: payload
    }, false); 
};

// ============================================================================
//                                 NEWS
// ============================================================================

/**
 * Получить новости (Show News)
 * Endpoint: GET /api/news/show
 */
export const getNews = async () => {
    return request("/api/news/show", {
        method: "GET"
    }, true);
};

/**
 * Добавить новость (Write News)
 * Endpoint: POST /api/news/add
 */
export const addNews = async (source, about, social, photo_url = null) => {
    return request("/api/news/add", {
        method: "POST",
        body: { source, about, social, photo_url }
    }, true);
};

/**
 * Обновить новость (Update News)
 * Endpoint: PUT /api/news/update
 */
export const updateNews = async (id, about, social) => {
    return request("/api/news/update", {
        method: "PUT",
        body: { id, about, social }
    }, true);
};

/**
 * Подтвердить новость (Approve News)
 * Endpoint: PATCH /api/news/approve
 */
export const approveNews = async (id, publishingDate) => {
    // publishingDate должна быть строкой ISO 8601
    return request("/api/news/approve", {
        method: "PATCH",
        body: { id, publishing: publishingDate }
    }, true);
};

/**
 * Удалить новость (Delete News)
 * Endpoint: DELETE /api/news/delete
 */
export const deleteNews = async (id) => {
    return request("/api/news/delete", {
        method: "DELETE",
        body: { id }
    }, true);
};

/**
 * Принудительная публикация (Force Post News)
 * Endpoint: POST /api/news/force
 */
export const forcePostNews = async (id) => {
    return request("/api/news/force", {
        method: "POST",
        body: { id }
    }, true);
};

/**
 * Перевести новость (Translate News)
 * Endpoint: POST /api/news/translate
 */
export const translateNews = async (id) => {
    return request("/api/news/translate", {
        method: "POST",
        body: { id }
    }, true);
};

/**
 * Получить фото (Get Photo)
 * Endpoint: GET /api/news/photo/{photo_uuid}
 */
export const getPhoto = async (photoUuid) => {
    return request(`/api/news/photo/${photoUuid}`, {
        method: "GET"
    }, false);
};

/**
 * Чтение контекста VK (Read Context Vk)
 * Endpoint: GET /api/news/read_context_vk/{club_id}
 */
export const readContextVk = async (clubId) => {
    return request(`/api/news/read_context_vk/${clubId}`, {
        method: "GET"
    }, false);
};

// ============================================================================
//                                 KEYS
// ============================================================================

/**
 * Проверить наличие ключа (Is Has Key)
 * Endpoint: POST /api/keys/has
 */
export const checkKey = async (social) => {
    // social: "VK" | "TG"
    return request("/api/keys/has", {
        method: "POST",
        body: { social }
    }, true);
};

/**
 * Добавить ключ (Add Key)
 * Endpoint: POST /api/keys/add
 */
export const addKey = async (social, number, value) => {
    return request("/api/keys/add", {
        method: "POST",
        body: { social, number, value }
    }, true);
};


// ============================================================================
//                                 MOCK (Legacy)
// ============================================================================
function mockRequest(endpoint, body) {
    console.log(`[MOCK API] ${endpoint}`, body);
    return new Promise((resolve) => {
        setTimeout(() => {
            if (endpoint === "/api/auth/login" || endpoint === "/api/auth/register") {
                resolve({
                    access_token: "fake_jwt_token",
                    refresh_token: "fake_refresh_token",
                    token_type: "bearer",
                    expires_in: 3600,
                    login: "user@example.com",
                    name: "Mock User"
                });
            } else if (endpoint === "/api/rewrite") {
                resolve({
                    "source": "https://t.me/vrntrans/5617",
                    "social": "VK",
                    "about": [
                        {
                            "title": "2ГИС запускает калькулятор поездок — интригующее обновление для путешественников",
                            "body": "В 50 городах появился новый сервис от 2ГИС для оценки стоимости поездок на общественном транспорте. Он обещает выбирать оптимальные маршруты, но есть нюансы, о которых стоит знать. Завтра разберем подробности — следите за обновлениями!\n\nИсточник: https://t.me/vrntrans/5617",
                            "hashtags": [
                                "#2ГИС",
                                "#новыйсервис",
                                "#транспорт"
                            ]
                        },
                        {
                            "title": "Глубокий анализ сервиса 2ГИС: ключевые недочеты в расчете стоимости",
                            "body": "Сервис 2ГИС оценивает стоимость поездок в более чем 50 городах, однако его точность может быть неоднородной. К типичным проблемам относятся: 1) часто используется наличный тариф, хотя в некоторых городах (например, Москве) учтён безналичный расчёт; 2) не всегда учитываются бесплатные или льготные пересадки; 3) проездные билеты, которые могут снизить затраты, отражены не везде (также есть исключения, как те же Москва и Санкт-Петербург); 4) зачастую не различаются цены на регулярные и нерегулярные маршруты. Эти факторы снижают точность и удобство сервиса, а актуальность данных может варьироваться от города к городу.\n\nИсточник: https://t.me/vrntrans/5617",
                            "hashtags": [
                                "#анализ",
                                "#финансы",
                                "#общественныйтранспорт"
                            ],
                            "verification_failed": true,
                            "verification_comment": "Найдена неточность: Сервис 2ГИС оценивает стоимость поездок в более чем 50 городах, но по данным на 2023 год, он охватывает более 300 городов в России и других странах, что делает утверждение о 'более чем 50 городах' заниженным. Остальные факты, такие как использование наличного тарифа, учёт безналичного расчёта в Москве, проблемы с пересадками, проездными билетами и различиями в маршрутах, соответствуют типичным пользовательским отзывам и обзорам сервиса."
                        },
                        {
                            "title": "Итоги запуска сервиса 2ГИС: как улучшить опыт пользователей?",
                            "body": "Сервис оценки стоимости поездок от 2ГИС вышел, но пока не идеален. Для повышения точности нужны корректировки, такие как интеграция безналичных тарифов и учета проездных. Как вы считаете, какие изменения сделали бы этот инструмент незаменимым для ваших поездок? Делитесь идеями в комментариях!\n\nИсточник: https://t.me/vrntrans/5617",
                            "hashtags": [
                                "#обсуждение",
                                "#технологии",
                                "#городскаямобильность"
                            ]
                        }
                    ],
                    "photo_uuid": "b46b8a2f-a417-4709-b746-43765d9932d3",
                    "source_images": [
                        "https://cdn4.telesco.pe/file/TDPNNbDgBkpGR2Ns5QMtWC2kKUHOi1mzw1b-KQHwlrrRRsmsaWBlxV_v4mkre2eoBGts-08x0TAXAoH4Im-BKnxr8KujWuN6dcI_sZTJB0HHCfbqpJ54ojsOAU216r6_hbq-Egj7TjQ1QCvq8B999EyLsvcTkdqAGif01bXP4nybop7gR1m7YE1pfpXtFtvRS-kXXlGBJLT11IZogiRnB1p-BTXimd5rfJQU03dBprSXx1GnO0is3f2qK6vF_5dstCcX1eC_DJ3yjHjBcpwF33o4cXMx9zC_0NzfCtOtUk42wQPpLBseUj-tL8GTGnE5Ae6_7_NgE6PtzVOZ_WSebg.jpg"
                    ]
                });
            } else {
                resolve({});
            }
        }, 1000);
    });
}