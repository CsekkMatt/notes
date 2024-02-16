import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../model/note';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class NoteComponent {
    @Input() note!: Note;
}