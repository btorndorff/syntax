import { screen, render } from "@testing-library/react";
import IconButton from "./IconButton";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Star from "@mui/icons-material/Star";

describe("iconButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <IconButton
        accessibilityLabel="Star"
        onClick={() => {
          /* empty */
        }}
        icon={Star}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=IconButton element", async () => {
    render(
      <IconButton
        accessibilityLabel="Star"
        onClick={() => {
          /* empty */
        }}
        icon={Star}
      />,
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });

  it.todo("renders an indicator when the indicator color is specified"),
    async () => {
      render(
        <IconButton
          onClick={() => {
            /* empty */
          }}
          icon={Star}
          accessibilityLabel="Star"
        />,
      );
      const indicator = await screen.findAllByTestId("indicator");
      expect(indicator).toHaveLength(0);

      render(
        <IconButton
          onClick={() => {
            /* empty */
          }}
          icon={Star}
          accessibilityLabel="Star"
          indicatorColor="black"
        />,
      );
      const indicatorB = await screen.findAllByTestId("indicator");
      expect(indicatorB).toHaveLength(1);
    };

  it("sets an accessibility label", async () => {
    render(
      <IconButton
        onClick={() => {
          /* empty */
        }}
        icon={Star}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    expect(button).toHaveLength(1);
  });

  it("fires the onClick when it is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        onClick={handleClick}
        icon={Star}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    await userEvent.click(button[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the data-testid", () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        data-testid="iconbutton-test-id"
        onClick={handleClick}
        icon={Star}
        accessibilityLabel="Continue to the next step"
      />,
    );
    expect(screen.getByTestId("iconbutton-test-id")).toBeInTheDocument();
  });
});
