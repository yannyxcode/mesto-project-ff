// Здравствуйте, сможете пожалуйста подробно описать, что нужно исправить и почему,
// чтобы я сразу разобралась в этой теме и мне было более понятно увидеть на практике
// как лучше и почему, заранее благодарю за ревью
// С Наступающим Новым Годом!

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: 'a02104d7-d8ba-4f82-8c46-16c6a5910c9c',
        'Content-Type': 'application/json',
    },
};

const getData = (res) => {
    return res.ok
        ? res.json().then((data) => {
              return data;
          })
        : Promise.reject(`Ошибка: ${res.status}`);
};

const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    return getData(res);
};

const getInitialCards = () => {
    return fetchData(config.baseUrl + '/cards', {
        headers: config.headers,
    }).then((data) => {
        return data;
    });
};

const getInfoUser = () => {
    return fetchData(config.baseUrl + '/users/me', {
        headers: config.headers,
    }).then((data) => {
        return data;
    });
};

const getInitialInfo = async () => {
    const [userInfo, initialCards] = await Promise.all([
        getInfoUser(),
        getInitialCards(),
    ]);
    return [userInfo, initialCards];
};

const updateProfileUser = (userData) => {
    return fetchData(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userData.name,
            about: userData.about,
        }),
    }).then((data) => {
        return data;
    });
};

const postCard = (cardData) => {
    return fetchData(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        }),
    }).then((data) => {
        return data;
    });
};

const putLike = (cardId) => {
    return fetchData(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then((data) => {
        return data;
    });
};

const deleteLike = (cardId) => {
    return fetchData(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then((data) => {
        return data;
    });
};

const deleteCard = (cardId) => {
    return fetchData(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then((data) => {
        return data;
    });
};

const updateAvatar = (avatarLink) => {
    return fetchData(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    }).then((data) => {
        return data;
    });
};

export {
    getInitialCards,
    getInfoUser,
    getInitialInfo,
    updateProfileUser,
    postCard,
    putLike,
    deleteLike,
    deleteCard,
    updateAvatar,
};
