import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from "@angular/platform-browser";
import { Observable } from 'rxjs';
import { TalkService, Talk } from '../shared/talk.service';


@Component({
    selector: 'talk-view',
    templateUrl: './views/talk-view.component.html',
})
export class TalkViewComponent {
    public talk;

    constructor(router: Router, activatedRoute: ActivatedRoute, talks: TalkService, public domSanitizer: DomSanitizer, title: Title) {
        activatedRoute.params.switchMap(params =>
            talks.data.map(talkList => talkList[params['id']])
        ).subscribe(
            next => {
                this.talk = next;
                if (this.talk.title) {
                    title.setTitle(this.talk.title + " | fluin.io talks");
                }
                if (this.talk.url) {
                    this.talk.urlExists = true;
                    this.talk.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.talk.url);
                }
            }
            )
    }
} 