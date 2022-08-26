from shiny import *
import random
import numpy as np
import matplotlib
import matplotlib.pyplot as plt


def coinToss(n=1):
    return np.random.randint(0, 2, size=n)


def percPar(cnt, n):
    perc = 100 * cnt / n
    return "(" + str(np.around(perc, 1)) + "%)"


app_ui = ui.page_fluid(
    ui.h1("Coin toss app"),
    ui.tags.br(),
    ui.input_slider("obs", "Number of Coins", min=1, max=500, value=1),
    ui.input_action_button("flip", "Flip Coin(s)", class_="btn-primary"),
    ui.tags.br(),
    ui.tags.br(),
    ui.output_text("txt"),
    ui.output_plot("plot"),
)


def server(input, output, session):
    @output
    @render.text
    def txt():
        vals = result()
        catch_phrase = random.choice(["Huzzah", "Horrah", "Woah"])
        return f"{catch_phrase}! You landed {vals[0]} and {vals[1]}!"

    @reactive.Calc
    @reactive.event(input.flip)
    def result():
        xmin, xmax, dx = 1, input.obs(), 1
        x = np.arange(xmin, xmax, dx)
        tosses = coinToss(n=input.obs())
        a, b = x, [tosses[:i].mean() for i in x]

        h_cnt, t_cnt = np.sum(tosses == 1), np.sum(tosses == 0)
        h = (str(h_cnt) + " heads" + percPar(h_cnt, xmax),)
        t = str(t_cnt) + " tails" + percPar(t_cnt, xmax)
        return [h, t, a, b]

    @output
    @render.plot(alt="A line chart")
    def plot():
        if input.obs() > 5:
            chart = plt.plot(result()[2], result()[3])
            plt.ylabel("Proportion of heads")
            plt.xlabel("Flip number")
            return chart


app = App(app_ui, server)
