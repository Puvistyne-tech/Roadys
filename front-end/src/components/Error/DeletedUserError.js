class DeletedUserError extends Error {
    constructor(message) {
        super(message ? message : 'Your account has been deleted\nPlease return to signup screen to reactivate your account');
        this.name = 'DeletedUserError'
        this.code = 403
    }
}

