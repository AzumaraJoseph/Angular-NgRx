import * as AppState from "../../state/app.state"
import { UserState } from "./user.reducer"


export interface State extends AppState.State {
    user: UserState
}