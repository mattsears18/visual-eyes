import Tabular from 'meteor/aldeed:tabular';
import Eyeevents from '../Eyeevents';

const table = new Tabular.Table({
  name: 'EyeeventsByStudyIdParticipantId',
  collection: Eyeevents,
  pageLength: 10,
  extraFields: [
    'timestamp',
    'duration',
    'type',
    'aoiId',
    'participantId',
    'stimulusId',
  ],
  columns: [
    {
      data: 'participantName()',
      title: 'Participant',
      // render(data, type, row, meta) {
      //   return data || '';
      // },
    },
    {
      data: 'timestamp',
      type: 'num',
      title: 'Timestamp [ms]',
      render(data, type, row, meta) {
        return data;
      },
    },
    {
      data: 'getVideoTime()',
      type: 'num',
      title: 'Video Time',
      render(data, type, row, meta) {
        return data;
      },
    },
    {
      data: 'duration',
      type: 'num',
      title: 'Duration [ms]',
      // render(data, type, row, meta) {
      //   return data;
      // },
    },
    {
      data: 'type',
      title: 'Event Type',
      // render(data, type, row, meta) {
      //   return data || '';
      // },
    },
    {
      data: 'stimulusName()',
      title: 'Stimulus',
      // render(data, type, row, meta) {
      //   return data || '';
      // },
    },
    {
      data: 'aoiName()',
      title: 'Area of Interest (AOI)',
      // render(data, type, row, meta) {
      //   return data || '';
      // },
    },
  ],
  order: [[1, 'asc']],
});

export default table;
