import React from 'react';
import './charts.css';
import LineChart from './example-charts/LineChart';
import PieChart from './example-charts/PieChart';

export default function ChartsPage() {
  return (
    <div className="charts-page">
      <span>Charts Page</span>
      <LineChart />
      <PieChart />
    </div>
  );
}
