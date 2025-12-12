import UserView from "@/Views/UserView.vue";
import UserDefaultComp from "@/Components/User/UserDefaultComp.vue";

export default {
    path: "/user",
    component: UserView,
    children: [
        {
            path: "",
            name: "User",
            component: UserDefaultComp,
        }
    ]
}