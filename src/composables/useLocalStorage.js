function useLocalStorage() {
    function setToStorage(name, val) {
        localStorage.setItem(name, JSON.stringify(val))
    }
    function getFromStorage(name) {
        return JSON.parse(localStorage.getItem(name))
    }
    return { setToStorage, getFromStorage }
}
export default useLocalStorage