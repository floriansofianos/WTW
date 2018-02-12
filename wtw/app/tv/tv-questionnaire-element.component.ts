import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'tv-questionnaire-element',
    templateUrl: 'tv-questionnaire-element.component.html'
})

export class TVQuestionnaireElementComponent {
    @Input() tvshow: any;
    @Input() tvQuestionnaireInit: any;
    @Input() config: any;
    @Input() lang: string;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
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

    constructor(private domSanitizer: DomSanitizer, private translate: TranslateService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.tvshow) {
            this.ngOnInit();
        }
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
        // Get writers and actors from tv show
        var allWriters = _.filter(this.tvshow.tvShowCredits.crew, function (m) { return m.job === 'Screenplay' || m.job === 'Writer'; });
        var allActors = this.tvshow.tvShowCredits.cast;
        this.tvshow.writers = _.sortBy(allWriters, 'numberOfEpisodes').reverse().slice(0, Math.min(allWriters.length, 5));
        this.tvshow.actors = allActors.slice(0, Math.min(allActors.length, 6));
        this.getLabelRating();
        this.wantToWatch = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.wantToSee : false;
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
            movieDBId: this.tvshow.tvShowInfo.id,
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