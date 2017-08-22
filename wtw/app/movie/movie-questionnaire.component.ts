import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.movie) {
            this.ngOnInit();
        }
    }

    ngOnInit() {
        this.trailerUrl = this.getMovieVideo();
        this.genres = this.movie.genres.map(a => a.name).reduce((a, b) => a + ', ' + b);
        this.movieSeen = false;
        this.seenValue = 3;
        this.wantToWatch = false;
        this.onChange();
    }

    onRatingChange = ($event: any) => {
        if ($event.rating) this.seenValue = $event.rating;
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
}