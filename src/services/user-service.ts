import apiClient from "./api-client";

export interface UserProps {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<UserProps[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  addUser(newUser: UserProps) {
    return apiClient.post("/users", newUser);
  }

  deleteUser(id: number) {
    return apiClient.delete("/users/" + id);
  }

  updateUser(user: UserProps) {
    return apiClient.patch("/users/" + user.id, user);
  }
}

export default new UserService();
