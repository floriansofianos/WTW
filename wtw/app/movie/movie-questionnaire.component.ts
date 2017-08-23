﻿import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'movie-questionnaire',
    templateUrl: 'movie-questionnaire.component.html'
})

export class MovieQuestionnaireComponent {
    @Input() movie: any
    @Input() config: any;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    trailerUrl: any;
    genres: string;
    releaseYear: string;
    movieSeen: boolean;
    seenValue: number;
    sliderConfiguration: any;
    wantToWatch: boolean;
    labelRating: string;

    constructor(private domSanitizer: DomSanitizer, private translate: TranslateService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.movie) {
            this.ngOnInit();
        }
    }

    ngOnInit() {
        this.trailerUrl = this.getMovieVideo();
        this.genres = this.movie.genres ? (this.movie.genres.length > 0 ? this.movie.genres.map(a => a.name).reduce((a, b) => a + ', ' + b) : '') : '';
        this.movieSeen = false;
        this.seenValue = 3;
        this.getLabelRating();
        this.wantToWatch = false;
        this.onChange();
    }

    onRatingChange = ($event: any) => {
        if ($event.rating) {
            this.seenValue = $event.rating;
            this.getLabelRating();
        }
        this.onChange();
    };

    getAllTrailers() {
        if (this.movie.trailers) {
            let trailers = this.movie.trailers.filter(
                t => t.type === 'Trailer' && t.site === 'YouTube');
            return trailers;
        }
        else return null;
    }

    isVideoPlayerDisplayed() {
        let trailers = this.getAllTrailers();
        if (trailers) {
            return trailers.length > 0;
        }
        else return false;
    }

    getMovieVideo() {
        let trailers = this.getAllTrailers();
        if (trailers && trailers.length > 0) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailers[0].key + '?ecver=2');
        }
        else return null;
    }

    isImgProfile(file: string) {
        if (file === null || file === '') return false;
        else return true;
    }

    onChange() {
        this.notify.emit({
            isSeen: this.movieSeen,
            movieDBId: this.movie.id,
            rating: this.seenValue,
            wantToSee: this.wantToWatch
        });
    }

    getLabelRating() {
        let labelTranslationVar = this.seenValue === 1 ? 'MOVIE_QUESTIONNAIRE.POOR' : (this.seenValue === 2 ? 'MOVIE_QUESTIONNAIRE.AVERAGE' : (this.seenValue === 3 ? 'MOVIE_QUESTIONNAIRE.GOOD' : (this.seenValue === 4 ? 'MOVIE_QUESTIONNAIRE.VERYGOOD' : (this.seenValue === 5 ? 'MOVIE_QUESTIONNAIRE.MASTERPIECE' : 'Error!'))));
        this.translate.get(labelTranslationVar).subscribe((res: string) => {
            this.labelRating = res;
        });
    }
}