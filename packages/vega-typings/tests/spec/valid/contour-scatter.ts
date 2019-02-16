import { Spec } from 'vega';

// https://vega.github.io/editor/#/examples/vega/bar-chart
export const spec: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "width": 200,
  "height": 200,
  "padding": 5,
  "autosize": "pad",

  "signals": [
    {
      "name": "count", "value": 5,
      "bind": {"input": "select", "options": [1, 2, 3, 4, 5, 10]}
    },
    {
      "name": "nice", "value": false,
      "bind": {"input": "checkbox"}
    }
  ],

  "data": [
    {
      "name": "source",
      "url": "data/cars.json",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.Horsepower != null && datum.Miles_per_Gallon != null && datum.Acceleration != null"
        }
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "source", "field": "Horsepower"},
      "range": [0,200]
    },
    {
      "name": "y",
      "type": "linear",
      "round": true,
      "nice": true,
      "zero": true,
      "domain": {"data": "source", "field": "Miles_per_Gallon"},
      "range": [200,0]
    }
  ],

  "axes": [
    {
      "scale": "x",
      "grid": true,
      "domain": false,
      "orient": "bottom",
      "tickCount": 5,
      "title": "Horsepower"
    },
    {
      "scale": "y",
      "grid": true,
      "domain": false,
      "orient": "left",
      "titlePadding": 5,
      "title": "Miles_per_Gallon"
    }
  ],

  "marks": [
    {
      "type": "group",
      "clip": true,
      "data": [
        {
          "name": "contours",
          "source": "source",
          "transform": [
            {
              "type": "contour",
              "x": {"expr": "scale('x', datum.Horsepower)"},
              "y": {"expr": "scale('y', datum.Miles_per_Gallon)"},
              "size": [{"signal": "width"}, {"signal": "height"}],
              "count": {"signal": "count"},
              "nice": {"signal": "nice"}
            }
          ]
        }
      ],
      "scales": [
        {
          "name": "color",
          "type": "linear",
          "domain": {"data": "contours", "field": "value"},
          "range": "ramp"
        }
      ],
      "marks": [
        {
          "type": "path",
          "from": {"data": "contours"},
          "encode": {
            "enter": {
              "stroke": {"value": "#888"},
              "strokeWidth": {"value": 1},
              "fill": {"scale": "color", "field": "value"},
              "fillOpacity": {"value": 0.35}
            }
          },
          "transform": [
            { "type": "geopath", "field": "datum" }
          ]
        }
      ]
    },
    {
      "name": "marks",
      "type": "symbol",
      "from": {"data": "source"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "Horsepower"},
          "y": {"scale": "y", "field": "Miles_per_Gallon"},
          "size": {"value": 4},
          "fill": {"value": "black"}
        }
      }
    }
  ]
};
