
import { User } from "./user.model"
const findLastUserId = async (role: string): Promise<number> => {
    const lastUser = await User.findOne({ role }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 }) // Get the latest user
        .lean();
    
    if (lastUser?.id) {
        const lastIdNumber = parseInt(lastUser.id.split('-')[1], 10);
        return lastIdNumber || 0;
    }

    return 0;
};
export const generateUserId = async (role: string): Promise<string> => {
    const lastId = await findLastUserId(role);
    const newId = (lastId + 1).toString().padStart(3, '0'); // Ensures 3-digit format
    return `${role}-${newId}`;
};