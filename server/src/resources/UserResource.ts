import { UserDocument } from '@db/models/User';

class UserResource {
    email: string;
    id: string;

    constructor(model: UserDocument) {
        this.email = model.email;
        this.id = model._id;
    }
}

export default UserResource;