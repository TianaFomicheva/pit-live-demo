import useLocalStorage from '@/composables/useLocalStorage.js'
const useLocal = useLocalStorage()

export { fakeBackend };

// array in local storage for registered users
const usersKey = 'vue-3-pinia-registration-login-example-users';
let users = useLocal.getFromStorage(usersKey) || [];

function fakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/user/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/user/register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/user') && opts.method === 'GET':
                        return getUsers();
                    case url.match(/\/user\/\d+$/) && opts.method === 'GET':
                        return getUserById();
                    case url.match(/\/user\/\d+$/) && opts.method === 'PUT':
                        return updateUser();
                    case url.match(/\/user\/\d+$/) && opts.method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { email, password } = body()
                const savedUser = useLocal.getFromStorage('user')
                const user = savedUser.email === email ? {... savedUser, password} : false

                if (!user) return error('Username or password is incorrect');

                return ok({
                    ...basicDetails(user),
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body();

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                useLocal.setToStorage('user', user._value);
                return ok();
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }

            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl());
                return ok(basicDetails(user));
            }

            function updateUser() {
                if (!isAuthenticated()) return unauthorized();

                let params = body();
                let user = users.find(x => x.id === idFromUrl());

                // only update password if entered
                if (!params.password) {
                    delete params.password;
                }

                // if username changed check if taken
                if (params.username !== user.username && users.find(x => x.username === params.username)) {
                    return error('Username "' + params.username + '" is already taken')
                }

                // update and save user
                Object.assign(user, params);
                useLocal.setToStorage(usersKey, users);

                return ok();
            }

            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                useLocal.setToStorage(usersKey, users);
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(user) {
                const {  firstName, lastName, email, password, mobile } = user;
                return {  firstName, lastName, email, password, mobile };
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}
