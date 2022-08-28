import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { VideoGamesStateService } from '../video-game-state.service';
import { OrderBy } from '../../../core/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  OrderBy = OrderBy;

  form: FormGroup = this.fb.group({
    name: [''],
    score: [0],
    orderBy: []
  });

  constructor(private fb: FormBuilder, private videoGamesStateService: VideoGamesStateService) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      const { name, score, orderBy } = value;
      this.videoGamesStateService.filter(name, score, orderBy);
    });
  }
}
