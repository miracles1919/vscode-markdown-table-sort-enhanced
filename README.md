# vscode-markdown-table-sort-enhanced README

VS Code extension that provides markdown formatting and table sort

## Features

- Format tables in md
- Table sort
- Select a Folder to format md files

```ts
| Name  | Description | Type |
| color       | The color of the button. | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'`  |
| fill        | The fill mode. | `'solid' \| 'outline' \| 'none'` |
| size        | The size of the button.  | `'mini' \| 'small' \| 'middle' \| 'large'`   | `'middle'`       |
| block       | Should the button displays as block element.   | `boolean` |
| disabled    | Should the button be disabled. | `boolean`     |
| loading     | Should the button displays as loading state. | `boolean \| 'auto'`       |
| loadingText | The extra text displayed in loading state. | `string` |
| loadingIcon | The customized `icon` in loading state. | `ReactNode` |
| onClick     | The click event. | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void \| Promise<void>` |
| type        | The `type` prop of native `button` element.  | `'submit' \| 'reset' \| 'button'` |
| shape       | The shape of the button. | `'default' \| 'rounded' \| 'rectangular'`|
```

```ts
| Name        | Description                                  | Type                                                                                |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| block       | Should the button displays as block element. | `boolean`                                                                           |
| color       | The color of the button.                     | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'`                      |
| disabled    | Should the button be disabled.               | `boolean`                                                                           |
| fill        | The fill mode.                               | `'solid' \| 'outline' \| 'none'`                                                    |
| loading     | Should the button displays as loading state. | `boolean \| 'auto'`                                                                 |
| loadingIcon | The customized `icon` in loading state.      | `ReactNode`                                                                         |
| loadingText | The extra text displayed in loading state.   | `string`                                                                            |
| onClick     | The click event.                             | `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void \| Promise<void>` |
| shape       | The shape of the button.                     | `'default' \| 'rounded' \| 'rectangular'`                                           |
| size        | The size of the button.                      | `'mini' \| 'small' \| 'middle' \| 'large'`                                          |
| type        | The `type` prop of native `button` element.  | `'submit' \| 'reset' \| 'button'`                                                   |
```

## Referenced

- https://github.com/simonguo/vscode-markdown-table-sort
