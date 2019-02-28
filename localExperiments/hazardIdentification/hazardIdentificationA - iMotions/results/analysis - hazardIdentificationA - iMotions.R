library(rstudioapi)
library(lmSupport)
library(ggplot2)
library(ggpmisc)
library(dplyr)
library(ggpubr)
library(lolcat)
library(mediation)
library(lm.beta)
library(car)
source('http://psych.colorado.edu/~jclab/R/mcSummaryLm.R')


filePath = 'p5000vg5000mvt5000 - 5 Sec MVT.csv'


currentPath = paste(strsplit(getActiveDocumentContext()$path, split = "/")[[1]][1:(length(strsplit(getActiveDocumentContext()$path, split = "/")[[1]])-1)], collapse = "/")
setwd(dirname(currentPath ))

analysis = read.csv(file = paste(c(currentPath, filePath), collapse="/"), header=TRUE)
data = Filter(is.numeric, analysis)
data = data[, -c(1:3)] # delete columns 1 through 3

cors2 = cor(data)^2

xName = "viewingDurationTotal"
yName = "HRPS"
plotLabel = "Period: 5000, Viewing Gap: 5000, Min Viewing Time: 5000"

formula = y ~ x

ggplot(data, aes_string(x = xName, y = yName)) +
  geom_point() +
  geom_smooth(method = "lm", formula = formula, se = TRUE) +
  stat_poly_eq(aes(label =  paste(stat(eq.label), stat(rr.label), stat(adj.rr.label), sep = "~~~~")), 
               label.x.npc = "left", label.y.npc = 0.90,
               formula = formula, rr.digits = 3, coef.digits = 4, parse = TRUE, size = 4) +
  stat_fit_glance(method = 'lm',
                  method.args = list(formula = formula),
                  geom = 'text',
                  aes(label = paste("Slope P-value = ", signif(..p.value.., digits = 3), sep = "")),
                  label.x.npc = 'left', label.y.npc = 0.85, size = 4) + 
  annotate("text", x = min(data[xName]), y = min(data[yName]) * 0.6, label = plotLabel, hjust = 0, vjust = 0)

x = unlist(data[xName])
y = unlist(data[yName])

model = lm(y ~ x)
summary(model)
mcSummary(model)

model = lm(data$HRI ~ data$viewingDurationTotal + data$Hazard.Fixation..)
mcSummary(model)