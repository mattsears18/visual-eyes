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
library(stringr)
library(readxl)
source('http://psych.colorado.edu/~jclab/R/mcSummaryLm.R')


filePath = 'MFD120 MOSF0 - drawingComplexity.xlsx'

currentPath = paste(strsplit(getActiveDocumentContext()$path, split = "/")[[1]][1:(length(strsplit(getActiveDocumentContext()$path, split = "/")[[1]])-1)], collapse = "/")
setwd(dirname(currentPath ))

data = read_excel(paste(c(currentPath, filePath), collapse="/"), sheet = "DrawingComplexity")
data$meanVisitDuration = data$meanVisitDuration / 1000
data$totalVisitDuration = data$totalVisitDuration / 1000
data$meanCoverage = data$meanCoverage * 100
data$meanCoverageOmitZeros = data$meanCoverageOmitZeros * 100
data$meanCoverageTimeWeighted = data$meanCoverageTimeWeighted * 100

cors = cor(Filter(is.numeric, data))
cors2 = cors^2

ggplot(data, aes(y=meanCoverageOmitZeros, x=referenceCount)) +
  geom_point() +
  geom_smooth(method="lm")

# averagePipesPerFitting
# angledFittingCount
# proportionAngledFitting
# referenceCount

# totalVisits
# meanvisitDuration

model = lm(data$totalVisits ~ data$proportionAngledFittings)
mcSummary(model)
