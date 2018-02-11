import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TVRecommandationService } from './tv-recommandation.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'tv-recommandation',
    templateUrl: 'tv-recommandation.component.html'
})

export class TVRecommandationComponent {
    @Input() tvshow: any;
    @Input() tvQuestionnaireInit: any;
    @Input() config: any;
    @Input() lang: string;
    @Input() availableOnPlex: boolean;
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
    jobCreator: string;
    jobWriter: string;
    grade: number;
    gradeLoaded: boolean;
    gradeRelevant: boolean;
    gradeComments: Array<any>;
    saving: boolean;
    gradeCommentsLevels = ['WTW.HATE_', 'WTW.DISLIKE_', '', 'WTW.LIKE_', 'WTW.LOVE_'];

    constructor(private domSanitizer: DomSanitizer, private translate: TranslateService, private tvRecommandationService: TVRecommandationService, private router: Router) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.movieSeen || changes.wantToWatch) {
            this.onChange();
        }
    }

    ngOnInit() {
        this.translate.get('MOVIE_QUESTIONNAIRE.CREATOR').subscribe((res: string) => {
            this.jobCreator = res;
        });
        this.translate.get('MOVIE_QUESTIONNAIRE.WRITER').subscribe((res: string) => {
            this.jobWriter = res;
        });
        this.trailerUrl = this.getTVVideo();
        this.genres = this.tvshow.tvShowInfo.genres ? (this.tvshow.tvShowInfo.genres.length > 0 ? this.tvshow.tvShowInfo.genres.map(a => a.name).reduce((a, b) => a + ', ' + b) : '') : '';
        this.movieSeen = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.isSeen : false;
        this.seenValue = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.rating : 3;
        this.getLabelRating();
        this.wantToWatch = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.wantToSee : false;
        this.gradeLoaded = false;
        this.tvRecommandationService.getScore(this.tvshow.tvShowInfo.id).subscribe(response => {
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
        if (this.tvshow.trailers) {
            let trailers = _.filter(this.tvshow.trailers.results,
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

    getTVVideo() {
        let trailers = this.getAllTrailers();
        if (trailers && trailers.length > 0) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailers[0].key + '?ecver=2');
        }
        else return null;
    }

    onChange() {
        this.notify.emit({
            isSeen: this.movieSeen,
            movieDBId: this.tvshow.id,
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