import moment from 'moment';

export function calculateDateDiff(pastDate: number) {
    return moment(pastDate).fromNow(true) + ' ago'
}
