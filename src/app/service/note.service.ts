import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import { NewNote } from '../model/new.note';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private apiUrl = 'https://quarkus-azure-functionn-1703850888742.azurewebsites.net/api/notes';

    constructor(private http: HttpClient) { }

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.apiUrl);
    }

    getNote(id: number): Observable<Note> {
        return this.http.get<Note>(`${this.apiUrl}/${id}`);
    }

    addNote(note: NewNote): Observable<Note> {
        return this.http.post<Note>(this.apiUrl, note);
    }

    updateNote(note: Note): Observable<Note> {
        return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
    }

    deleteNote(id: string): Observable<Note> {
        return this.http.delete<Note>(`${this.apiUrl}/${id}`);
    }
}