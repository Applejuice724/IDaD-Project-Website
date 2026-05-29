<template>
  <div class="my-4">
    <h4 class="fw-bold mb-3">Collection Stats</h4>
    <div class="d-flex gap-4 flex-wrap" ref="chartsRef">
      <div>
        <p class="text-muted small mb-1">By Card Type</p>
        <svg ref="svgRef"></svg>
      </div>
      <div ref="barRef">
        <p class="text-muted small mb-1">By Game</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'




const props = defineProps({
  cards:{type: Array, default: () => []},
  

})

const svgRef = ref(null)

onMounted(() => {
  const typeCounts = {}
  props.cards.forEach(card => {
    const t = card.cardType || 'Uknown'
    typeCounts[t] = (typeCounts[t] || 0) + 1

  })



  const data = Object.entries(typeCounts).map(([name, value]) => ({name, value}))

  const width = 300
  const height = 300
  const radius = 120

  const svg = d3.select(svgRef.value)
  .attr('width', width)
  .attr('height', height)

  const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const color = d3.scaleOrdinal(d3.schemeTableau10)

  const pie = d3.pie().value(d => d.value)
  const arc = d3.arc().innerRadius(60).outerRadius(radius)

  g.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.name))
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    

  g.selectAll('text')
    .data(pie(data))
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .text(d => `${d.data.name} (${d.data.value})`)

    const gameCounts = {}
    props.cards.forEach(card => {
      const g = card.game || 'Unknown'
      gameCounts[g] = (gameCounts[g] || 0) + 1
    })

    const barData = Object.entries(gameCounts).map(([name, value]) => ({name, value}))

    const bWidth = 300
    const bHeight = 200
    const margin = {top: 20, right: 20, bottom: 40, left: 40}
    
    const bSvg = d3.select(svgRef.value.parentNode).append('svg')
      .attr('width', bWidth)
      .attr('height', bHeight)

    const bG = bSvg.append('g')
      .attr('transform',`translate(${margin.left}, ${margin.top})`)

    const x = d3.scaleBand()
    .domain(barData.map(d => d.name))
    .range([0, bWidth - margin.left - margin.right])
    .padding(0.3)

    const y = d3.scaleLinear()
    .domain([0, d3.max(barData, d => d.value)])
    .range([bHeight - margin.top - margin.bottom, 0])

    bG.append('g')
    .attr('transform', `translate(0, ${bHeight - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x))

    bG.append('g')
    .call(d3.axisLeft(y).ticks(3))

    bG.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => bHeight - margin.top - margin.bottom - y(d.value))
    .attr('fill', '#6c63ff')
    .attr('rx', '4')




})
</script>
