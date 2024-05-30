import { UserDocument } from '../db/models/User';

class UserResource {
    email: string;
    id: string;
    isActivated: boolean;

    constructor(model: UserDocument) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}

export default UserResource;