import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Note } from './model/note';
import { NoteService } from './service/note.service';
import { NoteComponent } from "./component/note.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewNote } from './model/new.note';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NoteComponent, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class AppComponent implements OnInit {
  title = 'notes-app';
  notes: Note[] = [];
  selectedNote: Note | null = null;
  editingNoteId: string | null = null;
  newNote: NewNote = { title: '', content: '' };

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

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
    // this.noteService.updateNote(note).subscribe(() => this.getNotes());
    this.noteService.updateNote(note).subscribe({
      next: () => {
        // Update the note in the local array of notes:
        // const index = this.notes.findIndex(n => n.id === note.id);
        // if (index !== -1) {
        //   this.notes[index] = note;
        // }
        this.snackBar.open(`Note "${note.title}" was updated successfully`, 'Close', {
          duration: 5000,
        });
      },
      error: error => {
        console.error('Error updating note:', error);
      }
    });
  }

  deleteNote(id: string): void {
    const noteId = Number(id);
    const noteTitle = this.notes.find(note => note.id === noteId)?.title;
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.snackBar.open(`Note "${noteTitle}" was deleted successfully`, 'Close', {
          duration: 5000,
        });
      },
      error: error => {
        console.error('Error deleting note:', error);
      }
    });
  }

  createNote(newNote: NewNote) {
    this.noteService.addNote(newNote).subscribe({
      next: createdNote => {
        // this.notes.push(createdNote);
        this.snackBar.open(`Note "${newNote.title}" was created successfully`, 'Close', {
          duration: 5000,
        });
        // Clear the input fields
        this.newNote.title = '';
        this.newNote.content = '';
        this.getNotes();
      },
      error: error => {
        console.error('Error creating note:', error);
      }
    });
  }

  startEditing(noteId: string) {
    this.editingNoteId = noteId;
  }
  stopEditing() {
    this.editingNoteId = null;
  }
}
