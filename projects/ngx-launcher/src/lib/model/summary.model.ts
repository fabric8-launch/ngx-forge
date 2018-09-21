import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class Projectile<T> {
  private _state = {};
  private _selectedSection: string;

  get selectedSection(): string {
    if (!this._selectedSection) {
      this._selectedSection = this.searchParams.get('selectedSection');
    }
    return this._selectedSection;
  }

  set selectedSection(selectedSection: string) {
    this._selectedSection = selectedSection;
  }

  setState(stepId: string, state: StepState<T>) {
    this._state[stepId] = state;
  }

  getState(stepId: string): StepState<T> {
    return this._state[stepId];
  }

  getSavedState(stepId: string): any {
    const state = this.searchParams.get(stepId);
    return JSON.parse(state);
  }

  get redirectUrl(): string {
    const url = new URL(this.toUrl(), window.location.href);
    url.hash = window.location.hash;
    return url.toString();
  }

  toUrl(): string {
    return '?selectedSection=' + this._selectedSection + '&' + Object.keys(this._state).map(k => {
      this._state[k].save();
      return `${encodeURIComponent(k)}=${encodeURIComponent('{' +
        this._state[k].filters.map((f: Filter) => this.stateToJsonPart(f, this._state[k].state)) + '}')}`;
    }).join('&');
  }

  private stateToJsonPart(f: Filter, state: any) {
    return `"${f.name}":${JSON.stringify(_.get(state, f.value, ''))}`;
  }

  private get searchParams() {
    return new URL(window.location.href).searchParams;
  }
}

export class StepState<T> {
  constructor(private _state: T, private _filters: Filter[]) {}

  save(): any {
    return this.filters.map(f => ({ name: f.name, value: _.get(this.state, f.value) }));
  }

  get state(): T {
    return this._state;
  }

  get filters(): Filter[] {
    return this._filters;
  }
}

export class Filter {
  constructor(public name: string, public value: string) {}
}
