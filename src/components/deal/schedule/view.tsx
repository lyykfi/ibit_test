import { Currencies } from 'constants/currencies';
import * as moment from 'moment';
import * as React from 'react';

import { IDeal } from 'models/deal';
import { InjectedTranslateProps, translate } from 'react-i18next';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {
    deals?: IDeal[];
}

/**
 * state
 */
interface IState {
    currentDate: moment.Moment;
}

@(translate() as any)
export default class DealScheduleView extends React.Component<Partial<IProps>, IState> {
    /**
     * mins
     */
    private COUNT_MIN = 10;

    /**
     * canvas
     */
    private ctx: any = null;

    /**
     * canvas
     */
    private canvas: any = null;

    /**
     * @constructor
     * @param props
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentDate: moment(),
        };
    }

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t, deals} = this.props;
        const formatedDate = this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a');

        return deals && t ? <div className='deals_schedule box'>
            <div className='title'>
                <h2>{t('deal.schedule.title')}</h2>
                <p className='date'>{formatedDate}</p>
            </div>
            <div className='inner'>
                <canvas id='schedule_canvas' />
            </div>
        </div> : null;
    }

    /**
     * @method componentDidUpdate
     */
    public componentDidUpdate() {
        this.canvas = document.getElementById('schedule_canvas');

        if (this.canvas && this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');

            this.drawBorder();
            this.drawGrid();
        }
    }

    /**
     * draw border
     */
    private drawBorder() {
        this.ctx.strokeRect(0, 0, this.canvas.width - 20, this.canvas.height - 20);
    }

    /**
     * draw grid
     */
    private drawGrid() {
        const TIME_LIMIT = 600000;

        console.log(this.props.deals);

        if (this.props.deals) {
            let max: number = 0;

            this.props.deals.forEach((item) => {
                const value = parseInt(String(item.value), 10);
                if (value > max) {
                    max = value;
                }
            });

            this.props.deals.sort((a: any, b: any) => {
                const dateA = moment(a.date);
                const dateB = moment(b.date);

                if (dateA.unix() > dateB.unix()) {
                    return 1;
                }

                if (dateA.unix() < dateB.unix()) {
                    return -1;
                }

                return 0;
            });

            const widthCell = parseInt(String((this.canvas.width - 20) / this.COUNT_MIN), 10);
            const heightCell = parseInt(String((this.canvas.height - 20) / this.COUNT_MIN), 10);

            let i: number = 0;

            for (i = 0; i <= this.COUNT_MIN; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(widthCell * i, 0);
                this.ctx.lineTo(widthCell * i, this.canvas.height - 20);
                this.ctx.stroke();

                this.ctx.font = '7px Arial';
                this.ctx.fillText(moment().add(-(this.COUNT_MIN - i), 'minutes').format('h:mm'), widthCell * i - 25, this.canvas.height - 10);

                this.ctx.beginPath();
                this.ctx.moveTo(0, heightCell * i);
                this.ctx.lineTo(this.canvas.width - 20, heightCell * i);
                this.ctx.stroke();

                this.ctx.fillText(parseInt(String(max / i), 10), this.canvas.width - 18, heightCell * i);
            }

            const currentTime = moment().unix() * 1000;

            for (let j = 0; j <= this.props.deals.length; j++) {
                const item = this.props.deals[j];
                const nextItem = this.props.deals[j + 1];

                if (nextItem && item.date) {
                    const unixTime = moment(item.date).unix() * 1000;
                    const nextTime = moment(nextItem.date).unix() * 1000;

                    const value = parseInt(String(item.value), 10);
                    const nextValue = parseInt(String(nextItem.value), 10);

                    let valuePercent = (max - value) / value;
                    let nextValuePercent = (max - nextValue) / nextValue;

                    const firstTime = ((TIME_LIMIT - (currentTime - unixTime)) / TIME_LIMIT) * 100;
                    const secondTime = ((TIME_LIMIT - (currentTime - nextTime)) / TIME_LIMIT) * 100;

                    if (nextValuePercent > 100) {
                        nextValuePercent = 100;
                    }

                    if (valuePercent > 100) {
                        valuePercent = 100;
                    }
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = '#ff0000';
                    this.ctx.moveTo((this.canvas.width - 30) / 100 * firstTime, (this.canvas.height - 30) / 100 * valuePercent);
                    this.ctx.lineTo((this.canvas.width - 30) / 100 * secondTime, (this.canvas.height - 30) / 100 * nextValuePercent);
                    this.ctx.stroke();
                }
            }
        }
    }
}
