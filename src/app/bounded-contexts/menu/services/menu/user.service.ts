import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";import { environment } from "src/environments/environment";
import {User} from "../../model/user.model";

@Injectable()
export class UserService {
  private readonly API_URL = `${environment.API}/game/user`;

  constructor(
    private readonly http: HttpClient,
  ) { }

  readByEmail(email: string) {
    return this.http.get<User>(`${this.API_URL}/email/${email}`).pipe(take(1));
  }

  create(user: User) {
    return this.http.post<User>(this.API_URL, user).pipe(take(1));
  }
}
