// TODO:
module.exports = {
    locales: {
        "/": {
            lang: "en-US",
            title: "SDE",
            description: "Success-driven Engineering"
        },
        "/ru/": {
            lang: "ru-RU",
            title: "VuePress",
            description: "Success-driven Engineering"
        }
    },
    themeConfig: {
        locales: {
            "/": {
                selectText: "Languages",
                label: "English",
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},

                // nav: [
                //     { text: "Nested", link: "/nested/" }
                // ],
                // sidebar: {
                //     "/": [/* ... */],
                //     "/nested/": [/* ... */]
                // }
            },
            "/ru/": {
                selectText: "Язык",
                label: "Русский",
                serviceWorker: {
                    updatePopup: {
                        message: "Доступны новые материалы.",
                        buttonText: "Обновить"
                    }
                },
                algolia: {},
                
                // nav: [
                //     { text: "Nested [ru]", link: "/ru/nested/" }
                // ],
                // sidebar: {
                //     "/ru/": [/* ... */],
                //     "/ru/nested/": [/* ... */]
                // }
            }
        }
    }
}