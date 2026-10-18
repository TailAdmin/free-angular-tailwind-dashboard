import { ApexXAxis } from 'ng-apexcharts';

interface TooltipSeriesItem {
  name?: string;
}

/**
 * Shared custom tooltip for area charts (matches the Next.js dashboards):
 * small category label, then one "dot  name  :  value" row per series.
 */
export function areaChartTooltip({ series, dataPointIndex, w }: any): string {
  const category =
    w.globals?.categoryLabels?.[dataPointIndex] ??
    w.config.xaxis?.categories?.[dataPointIndex] ??
    '';
  const colors: string[] = w.config.colors ?? ['#465FFF'];
  const seriesList = (w.config.series as TooltipSeriesItem[]) ?? [];

  const rows = seriesList
    .map((s, idx) => {
      const val = series[idx]?.[dataPointIndex];
      const color = colors[idx] ?? '#465FFF';
      const formattedVal =
        typeof val === 'number' ? val.toLocaleString() : (val ?? '');
      return `
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5">
            <span class="size-1.5 rounded-full shrink-0" style="background-color: ${color}"></span>
            <span class="w-13 text-xs text-gray-800 dark:text-white/90">${s.name ?? ''}</span>
            <span class="text-xs font-medium text-gray-400 dark:text-gray-500">:</span>
          </div>
          <span class="text-xs font-medium text-gray-800 dark:text-white/90">${formattedVal}</span>
        </div>
      `;
    })
    .join('');

  return `
    <div class="min-w-32.5">
      <p class="mb-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400">${category}</p>
      <div class="flex flex-col gap-1">
        ${rows}
      </div>
    </div>
  `;
}

/** Gradient vertical cursor line shown behind the hovered point. */
export function areaChartCrosshairs(isDark: boolean): ApexXAxis['crosshairs'] {
  return {
    show: true,
    width: 2,
    position: 'back',
    opacity: 1,
    stroke: { width: 0, color: 'none' },
    fill: {
      type: 'gradient',
      gradient: {
        colorFrom: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
        colorTo: '#9CB9FF',
        stops: [0, 100],
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
  };
}
