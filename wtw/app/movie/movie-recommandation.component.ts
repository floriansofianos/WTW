import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MovieRecommandationService } from './movie-recommandation.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'movie-recommandation',
    templateUrl: 'movie-recommandation.component.html'
})

export class MovieRecommandationComponent {
    @Input() movie: any;
    @Input() movieQuestionnaireInit: any;
    @Input() config: any;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifySave: EventEmitter<any> = new EventEmitter<any>();
    trailerUrl: any;
    genres: string;
    releaseYear: string;
    movieSeen: boolean;
    seenValue: number;
    sliderConfiguration: any;
    wantToWatch: boolean;
    labelRating: string;
    jobDirector: string;
    jobWriter: string;
    grade: number;
    gradeLoaded: boolean;
    gradeRelevant: boolean;
    gradeComments: Array<any>;
    saving: boolean;
    gradeCommentsLevels = ['WTW.HATE_', 'WTW.DISLIKE_', 'WTW.LIKE_', 'WTW.LOVE_'];

    constructor(private domSanitizer: DomSanitizer, private translate: TranslateService, private movieRecommandationService: MovieRecommandationService, private router: Router) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.movie) {
            this.ngOnInit();
        }
        if (changes.movieSeen || changes.wantToWatch) {
            this.onChange();
        }
    }

    ngOnInit() {
        this.translate.get('MOVIE_QUESTIONNAIRE.DIRECTOR').subscribe((res: string) => {
            this.jobDirector = res;
        });
        this.translate.get('MOVIE_QUESTIONNAIRE.WRITER').subscribe((res: string) => {
            this.jobWriter = res;
        });
        this.trailerUrl = this.getMovieVideo();
        this.genres = this.movie.genres ? (this.movie.genres.length > 0 ? this.movie.genres.map(a => a.name).reduce((a, b) => a + ', ' + b) : '') : '';
        this.movieSeen = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.isSeen : false;
        this.seenValue = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.rating : 3;
        this.getLabelRating();
        this.wantToWatch = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.wantToSee : false;
        this.gradeLoaded = false;
        this.movieRecommandationService.getScore(this.movie.id).subscribe(response => {
            var data = response.json();
            this.gradeRelevant = data.certaintyLevel >= 3;
            this.grade = Math.floor(data.score);
            this.gradeComments = _.map(data.comments, function (c) {
                return { isGood: c.level > 0, text: this.gradeCommentsLevels[c.level + 2] + c.type, name: c.name };
            }, this);

            this.gradeLoaded = true;
        },
            error => {
                this.router.navigate(['/error']);
            });
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

    clickSave() {
        this.saving = true;
        this.notifySave.emit({
            clickSave: true
        });
    }
}