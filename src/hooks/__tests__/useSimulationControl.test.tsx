import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { useSimulationControl } from "../useSimulationControl";

describe("useSimulationControl", () => {
  let handleNextStep: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleNextStep = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should return isPlaying as false initially", () => {
    const { result } = renderHook(() => useSimulationControl(handleNextStep));
    expect(result.current.isPlaying).toBe(false);
  });

  it("should toggle isPlaying state when togglePlay is called", () => {
    const { result } = renderHook(() => useSimulationControl(handleNextStep));

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  it("should start the interval when isPlaying is true", () => {
    const { result } = renderHook(() => useSimulationControl(handleNextStep));

    act(() => {
      result.current.togglePlay();
    });

    expect(vi.getTimerCount()).toBe(1);

    vi.advanceTimersByTime(3000);
    expect(handleNextStep).toHaveBeenCalledTimes(3);
  });

  it("should stop the interval when isPlaying is toggled to false", () => {
    const { result } = renderHook(() => useSimulationControl(handleNextStep));

    act(() => {
      result.current.togglePlay();
    });

    expect(vi.getTimerCount()).toBe(1);

    act(() => {
      result.current.togglePlay();
    });

    expect(vi.getTimerCount()).toBe(0);
  });

  it("should clear the interval on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useSimulationControl(handleNextStep),
    );

    act(() => {
      result.current.togglePlay();
    });

    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
