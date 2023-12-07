import { cleanup, render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Button from '../components/Button/Button';

afterEach(() => {
  cleanup();
});

it('should have correct displayName', () => {
  const renderedContainer = render(<Button> </Button>);
  const button = renderedContainer.container.firstChild as HTMLButtonElement;
  expect(button.tagName).toEqual('BUTTON');
  renderedContainer.unmount();
});
it('should have default props', () => {
  const renderedContainer = render(<Button> </Button>);
  const button = renderedContainer.container.firstChild as HTMLButtonElement;
  const { dataset } = button;
  const { size, theme, skin, testid } = dataset;
  expect(button.onclick).toBe(null);
  expect(button.type).toBe('submit');
  expect(button.style.cssText).toBe('');
  expect(size).toBe('medium');
  expect(theme).toBe(undefined);
  expect(skin).toBe('none');
  expect(testid).toBe(undefined);
  renderedContainer.unmount();
});

describe('style', () => {
  it('should have given style attribute', () => {
    const renderedContainer = render(<Button style={{ width: 100 }}> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.style.cssText).toBe('width: 100px;');
  });
});

describe(`type`, () => {
  it('should have given type attribute', () => {
    const renderedContainer = render(<Button type="button"> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.type).toBe('button');
  });
});

describe('onClick', () => {
  it('should have given onClick attribute', () => {
    const onClick = vi.fn();
    const renderedContainer = render(<Button onClick={onClick}> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    button.click();
    expect(onClick).toBeCalledTimes(1);
  });
});

describe(`size`, () => {
  it('should have given size data hook', () => {
    const renderedContainer = render(<Button size="large"> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.dataset.size).toBe('large');
  });
});
describe(`theme`, () => {
  it('should have given theme data hook', () => {
    const renderedContainer = render(<Button theme="active"> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.dataset.theme).toBe('active');
  });
});
describe(`skin`, () => {
  it('should have given skin data hook', () => {
    const renderedContainer = render(<Button skin="destructive"> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.dataset.skin).toBe('destructive');
  });
});
describe(`testId`, () => {
  it('should have given testId data hook', () => {
    const renderedContainer = render(<Button testId="test"> </Button>);
    const button = renderedContainer.container.firstChild as HTMLButtonElement;
    expect(button.dataset.testid).toBe('test');
  });
});
