export const baseUrl = 'https://nodejs-task-manager-api-seshu.herokuapp.com/';
// export const baseUrl='http://localhost:3001/'

const urls = {
    baseUrl: baseUrl,
    signUp: baseUrl + "users",
    login: baseUrl + "users/login",
    logout: baseUrl + "users/logout",
    logoutAllDevices: baseUrl + "users/logoutAll",
    userUrls: {
        uploadAvatar: baseUrl + "users/me/avatar",
        readProfile: baseUrl + "users/me",
        updateProfile: baseUrl + "users/me",
        deleteUser: baseUrl + "users/me",
        deleteProfile: baseUrl + "users/me/avatar"
    },
    taskUrls: {
        createTask: baseUrl + "tasks",
        getAllTasks: baseUrl + "tasks/",
        getTaskById: baseUrl + "tasks/",
        updateTaskById: baseUrl + "tasks/",
        deleteTaskById: baseUrl + "tasks/"
    }
};

export default urls;