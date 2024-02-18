import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../model/note';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../service/note.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    imports: [CommonModule, FormsModule, MatButtonModule],
    standalone: true
})
export class NoteComponent {
    @Input() note!: Note;
    @Input() editingNoteId: string | null;
    @Output() edit = new EventEmitter<string>();
    @Output() stopEditing = new EventEmitter<void>();
    @Output() delete = new EventEmitter<string>();


    constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
        this.editingNoteId = null;
    }

    save() {
        this.noteService.updateNote(this.note).subscribe(() => {
            this.stopEditing.emit();
        });

        this.noteService.updateNote(this.note).subscribe({
            next: () => {
                this.snackBar.open(`Note "${this.note.title}" was updated successfully`, 'Close', {
                    duration: 5000,
                });
            },
            error: error => {
                console.error('Error updating note:', error);
            }
        });
    }

    stopEditingNote() {
        this.stopEditing.emit();
    }

}