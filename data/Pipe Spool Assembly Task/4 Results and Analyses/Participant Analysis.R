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
source('http://psych.colorado.edu/~jclab/R/mcSummaryLm.R')


filePath = 'MFD120 MOSF0 - participantSummary.csv'
visitFilePath = 'MFD120 MOSF0 - visitSummary.csv'


currentPath = paste(strsplit(getActiveDocumentContext()$path, split = "/")[[1]][1:(length(strsplit(getActiveDocumentContext()$path, split = "/")[[1]])-1)], collapse = "/")
setwd(dirname(currentPath ))

analysis = read.csv(file = paste(c(currentPath, filePath), collapse="/"), header=TRUE)
visits = read.csv(file = paste(c(currentPath, visitFilePath), collapse="/"), header=TRUE)
visits$visitDuration = visits$visitDuration / 1000
data = Filter(is.numeric, analysis)
data = data[, -c(1:2)] # delete columns 1 through 2

data = data[, -c(3,5)] # deltet some more columns

data$averageCoverage = data$averageCoverage * 100
data$averageCoverageNoZeros = data$averageCoverageNoZeros * 100
data$timeAveragedCoverage = data$timeAveragedCoverage * 100


########################################################################
for(i in c(1:20)) {
  num = str_pad(i, 2, side="left", pad="0")
  d = subset(visits, pipefitter == paste('Pipefitter ', num, sep=""))
  
  # percentile/quantile analysis #######################################
#  for(quantVal in c(0.5, 0.6, 0.7, 0.8, 0.9, 0.95)) {
#    x = quantile(d$visitDuration, quantVal) 
#    print(paste(quantVal, " percentile: ", x, sep=""))
#    data[i, paste('quant', quantVal, sep="")] = x
#  } 
#  
#  print(" ")
  
  # greater than duration analysis #####################################
  for(duration in c(7.5)) {
    x = sum(d$visitDuration > duration)
    
    data[i, paste('gt', duration, sep="")] = x
    #data[i, paste('gtp', duration, sep="")] = x/nrow(d)
    
    print(paste("Greater than ", duration, ": ", x, "(", x/nrow(d), ")", sep=""))
  } 
}
########################################################################


cors = cor(data)
cors2 = cor(data)^2

ggplot(data, aes(y=gt7.5, x=averageCoverageNoZeros)) +
  geom_point() +
  geom_smooth(method="lm")

model = lm(data$averageCoverageNoZeros ~ data$gt7.5)
mcSummary(model)

