# hattrick-field



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute        | Description | Type                                           | Default     |
| ------------------- | ---------------- | ----------- | ---------------------------------------------- | ----------- |
| `flipped`           | `flipped`        |             | `boolean`                                      | `false`     |
| `ratingNoStar`      | `rating-no-star` |             | `boolean`                                      | `false`     |
| `ratingPositions`   | --               |             | `{ [positionId: number]: IRatingPosition; }`   | `undefined` |
| `size`              | `size`           |             | `number`                                       | `1`         |
| `trainingPositions` | --               |             | `{ [positionId: number]: ITrainingPosition; }` | `undefined` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"rating"`        |             |
| `"training-slot"` |             |


## Dependencies

### Depends on

- [hattrick-rating](../rating)

### Graph
```mermaid
graph TD;
  hattrick-field --> hattrick-rating
  hattrick-rating --> hattrick-progress-arc
  style hattrick-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
