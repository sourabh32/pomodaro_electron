import React from 'react';

const ModeTable = ({ completedModes }) => {
  const totalPomodoro = completedModes['Pomodoro'] || 0;
  const totalShortBreak = completedModes['Short Break'] || 0;
  const totalLongBreak = completedModes['Long Break'] || 0;
  const totalTime = totalPomodoro * 25 + totalShortBreak * 5 + totalLongBreak * 15;

  return (
    <div className='font-[ubuntu] text-white'>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Mode</th>
            <th className="px-4 py-2">Completed Sessions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(completedModes).map(([mode, sessions], index) => (
            <tr key={index} >
              <td className="border px-4 py-2">{mode}</td>
              <td className="border px-4 py-2">{sessions}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalTime > 0 && (
        <div className="mt-4">
          <p className="font-bold">Summary:</p>
          {totalPomodoro > 0 && <p>Total Focused: {totalPomodoro * 25} minutes</p>}
          {totalShortBreak > 0 && <p>Total Chilled: {totalShortBreak * 5} minutes</p>}
          {totalLongBreak > 0 && <p>Total Relaxed: {totalLongBreak * 15} minutes</p>}
          <p>Total Time: {totalTime} minutes</p>
        </div>
      )}
    </div>
  );
};

export default ModeTable;
