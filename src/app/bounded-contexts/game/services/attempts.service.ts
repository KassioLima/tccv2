import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";import { environment } from "src/environments/environment";
import {Attempts} from "../model/attempts.model";

@Injectable()
export class AttemptsService {
  private readonly API_URL = `${environment.API}/game/attempts`;

  constructor(
    private readonly http: HttpClient,
  ) { }

  create(attempt: any) {
    return this.http.post(this.API_URL, attempt).pipe(take(1));
  }
}
