import { Resource } from '../resource/resource';
import { noop, yes } from '../utility/kit';
import { match } from './match';

export class FilterState {
	constructor() {
		this.resource = new Resource();

		this.by = {};
		this.match = match;
		this.custom = yes;
		this.fetch = noop;
		this.unit = 'default';	// default|row

		this.assertFactory = () => ({
			equals: (x, y) => x === y,
			lessThan: (x, y) => x < y,
			isNull: x => x === '' || x === null || x === undefined
		});

		this.operatorFactory = (column) => {
			switch (column.type) {
				case 'text':
				case 'url':
				case 'email':
				case 'file': {
					return [
						'contains',
						'like',
						'notLike',
						'startsWith',
						'endsWith',
						'isEmpty',
						'isNotEmpty',
					];
				}
				case 'date':
				case 'datetime': {
					return [
						'between',
						'contains',
						'lessThan',
						'lessThanOrEquals',
						'greaterThan',
						'greaterThanOrEquals',
						'isEmpty',
						'isNotEmpty',
					];
				}
				case 'id':
				case 'currency':
				case 'number': {
					return [
						'between',
						'contains',
						'like',
						'lessThan',
						'lessThanOrEquals',
						'greaterThan',
						'greaterThanOrEquals',
						'isEmpty',
						'isNotEmpty',
					];
				}
				default: {
					return ['contains'];
				}
			}
		}
	}
}
