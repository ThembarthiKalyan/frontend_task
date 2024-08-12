function isAuthenticated(){
    if(window.localStorage){
        const isVerified = localStorage.getItem('isVerified');
        return isVerified;
    }
    return false;
}

function setToken(isVerified) {
    if (window.localStorage) {
        localStorage.setItem("isVerified", isVerified);
    }
}

function setId(id){
    if (window.localStorage) {
        localStorage.setItem("id", id);
    }
}

function getId(){
    if(window.localStorage){
        return localStorage.getItem('id');
    }
    return '';
}

export {isAuthenticated, setToken, setId, getId};
