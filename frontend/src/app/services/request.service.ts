import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export enum BodyTypes { JSON, FORMDATA };
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userID = ''
  appID = ''

  constructor(private http: HttpClient) { }

  requestGet<T>(url: string, model: object, headers = {}, callback: any = null, meta = { loading: "Loading", empty: "No results" }) {
    return new Observable(observer => {

      observer.next({ message: meta.loading });

      this.http.get<T>(url, { headers: new HttpHeaders(headers) })
        .subscribe(
          (response: any) => {
            if (response['status'] === 'error')
              observer.error(response['message'].toString());

            else if (response['status'] === 'warning')
              observer.next({ message: response['message'].toString() });

            else {
              if (Object.keys(response).indexOf('status') > -1) {
                delete response['status'];
              }
              let value = response;
              observer.next({ value: value });
            }
          }, err => { this.SaveError(err, "GET", { url, headers }); return observer.error(err) },

          callback);

    }).pipe(catchError(this.handleError))
      .subscribe(
        data => { this.DataToModel(data, model, true) },
        error => this.ErrorToModel(error, model)
      )
  }

  requestPost<T>(url: string, model: object, body: any, headers: any, callback: any = null, config: any = { bodyType: BodyTypes.JSON, images: [{ name: "", file: null }] }, meta = { loading: "Loading", empty: "No results" }) {
    return new Observable(observer => {

      observer.next({ message: meta.loading });

      let requestBody = body;

      if (config.bodyType === BodyTypes.FORMDATA) {
        let formData = new FormData();
        this.ObjectToFormdata(formData, body);

        /* if (config.image.name !== "" && config.image.file !== null)
          formData.append(config.image.name, config.image.file); */

        for (let img of config.images) {
          if (img.name !== "" && img.file !== null) {
            for (let file of img.file) {

              formData.append(img.name, file.imageFile);
            }
          }
        }

        requestBody = formData;

      }

      this.http.post<T>(url, requestBody, { headers: new HttpHeaders(headers) })
        .subscribe(
          response => this.ProcessMessageResponse(response, observer),
          err => { this.SaveError(err, "POST", { url, headers, body }); return observer.error(err) },
          callback);

    }).pipe(catchError(this.handleError))
      .subscribe(
        data => this.DataToModel(data, model),
        error => this.ErrorToModel(error, model)
      );
  }

  requestPut<T>(url: string, model: object, body: any, headers: any, callback: any = null, config: any = { bodyType: BodyTypes.JSON, image: { name: "", file: null } }, meta = { loading: "Loading", empty: "No results" }) {
    return new Observable(observer => {

      observer.next({ message: meta.loading });

      let requestBody = body;

      if (config.bodyType === BodyTypes.FORMDATA) {
        let formData = new FormData();
        this.ObjectToFormdata(formData, body);

        if (config.image.name !== "" && config.image.file !== null)
          formData.append(config.image.name, config.image.file);

        requestBody = formData;

      }

      this.http.put<T>(url, requestBody, { headers: new HttpHeaders(headers) })
        .subscribe(
          response => this.ProcessMessageResponse(response, observer),
          err => { this.SaveError(err, "PUT", { url, headers, body }); return observer.error(err) },
          callback);

    }).pipe(catchError(this.handleError))
      .subscribe(
        data => this.DataToModel(data, model),
        error => this.ErrorToModel(error, model)
      );
  }

  requestDelete<T>(url: string, model: object, headers: any, callback: any = null, meta = { loading: "Loading", empty: "No results" }) {
    return new Observable(observer => {

      observer.next({ message: meta.loading });

      this.http.delete<T>(url, { headers: new HttpHeaders(headers) })
        .subscribe(
          response => this.ProcessMessageResponse(response, observer),
          err => { this.SaveError(err, "DELETE", { url, headers }); return observer.error(err) },

          callback);

    }).pipe(catchError(this.handleError))
      .subscribe(
        data => this.DataToModel(data, model),
        error => this.ErrorToModel(error, model)
      );
  }

  //#region Auxiliare
  private ProcessMessageResponse(response: any, observer: any) {

    if (response['status'] === 'error')
      if ('conflict' in response)
        observer.error({ message: response['message'].toString(), conflict: response['conflict'] });
      else
        observer.error(response['message'].toString());

    else if (response['status'] === 'warning')
      observer.next({ message: response.toString() });

    else {
      //if status==="success"
      if (!response['message']) {
        observer.next({ message: response })
      } else {
        observer.next({ message: response['message'].toString() });
      }
    }
  }
  private SaveError(error: any, method: any, request: { url: string, headers: any, body?: any }) {
    let obj = {
      slug: `${location.pathname.split('/')[1]}`,
      user_id: `${this.userID}`,
      app_id: `${this.appID}`,//'5cdc6121e287493ec0da4d17',
      request_type: method.toLowerCase(),
      response_status: error.status,
      response_object: error.error,
      payload: { obj: "body gol" },
      headers: request.headers,
      token: 'nu-este-token',
      url: {
        path: 'no-este',
        params: 'no-este'
      }
    }

    if ('Authorization' in request.headers)
      obj.token = request.headers.Authorization.split(' ')[1];

    if ('body' in request)
      obj.payload = request.body;

    let u = new URL(request.url);

    obj.url.path = `${u.origin}${u.pathname}`
    obj.url.params = this.getQueryStringParams(u.search);

    console.log(obj)
    console.log(`${environment.apiUrl}/error-logs?company=${obj.slug}`)

    this.http.post(`${environment.apiUrl}/error-logs?company=${obj.slug}`, obj).subscribe(data => {
      console.log(data)
    });

    localStorage.setItem('eroare', JSON.stringify(obj));
  }

  private getQueryStringParams(query: any) {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params: any, param: any) => {
          let [key, value] = param.split('=');
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
          return params;
        }, {}
        )
      : {}
  };
  private DataToModel(data: any, model: any, hasValue = false) {

    model.message = "";
    model.error = "";

    if (data['message'])
      model.message = data['message'];

    if (hasValue) {
      if (data['value'])
        model.value = data['value'];
    }

  }
  private ErrorToModel(error: any, model: any) {

    if ('value' in model) {
      model['value'] = null;
    }
    if ('error' in model) {
      model.message = "";
      model.error = error;
    }
    else
      model.message = error;


  }

  private handleError(error: any) {
    if (error.error.conflict)
      return throwError(error.error.conflict)
    //daca este o eroare declansata de catre mine si nu de catre request.(Va contine mesajul)
    //if ((typeof error) === "string")
    if (error.error.statusCode == 500)
      return throwError("Ceva nu a mers bine.");
    else
      return throwError(error.error.message);

    //return throwError("Something bad happened; please try again later.");
  }


  ObjectToFormdata(formData: any, data: any, parentKey: any = null) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.ObjectToFormdata(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }


  }
  append(fd: FormData, dob: any, fob: any = null, p: string = '') {
    let apnd = this.append;

    function isObj(dob: any, fob: any, p: any) {
      if (typeof dob == "object") {
        if (!!dob && dob.constructor === Array) {
          p += '[]';
          for (let i = 0; i < dob.length; i++) {
            let aux_fob = !!fob ? fob[i] : fob;
            isObj(dob[i], aux_fob, p);
          }
        } else {
          apnd(fd, dob, fob, p);
        }
      } else {
        let value = !!fob ? fob : dob;
        fd.append(p, value);
      }
    }

    for (let prop in dob) {
      let aux_p = p == '' ? prop : `${p}[${prop}]`;
      let aux_fob = !!fob ? fob[prop] : fob;
      isObj(dob[prop], aux_fob, aux_p);
    }
  }
  //#endregion
}
