import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Note } from './model/note';
import { NoteService } from './service/note.service';
import { NoteComponent } from "./component/note.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NoteComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'notes-app';
  notes: Note[] = [];
  selectedNote: Note | null = null;
  editingNoteId: string | null = null;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }

  selectNote(note: Note): void {
    this.selectedNote = note;
  }

  addNote(note: Note): void {
    this.noteService.addNote(note).subscribe(note => this.notes.push(note));
  }

  updateNote(note: Note): void {
    this.noteService.updateNote(note).subscribe(() => this.getNotes());
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => this.getNotes());
  }
  
  startEditing(noteId: string) {
    this.editingNoteId = noteId;
  }
}
