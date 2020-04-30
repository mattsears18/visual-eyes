library(rstudioapi)
library(lmSupport)
library(ggplot2)
library(ggpmisc)
library(dplyr)
library(ggpubr)
library(lolcat)
library(mediation)
library(lm.beta)
library(car)s
library(stringr)
library(pracma)
source('http://psych.colorado.edu/~jclab/R/mcSummaryLm.R')


filePath = 'MFD120 MOSF0 - visitSummary.csv'


currentPath = paste(strsplit(getActiveDocumentContext()$path, split = "/")[[1]][1:(length(strsplit(getActiveDocumentContext()$path, split = "/")[[1]])-1)], collapse = "/")
setwd(dirname(currentPath ))

data = read.csv(file = paste(c(currentPath, filePath), collapse="/"), header=TRUE)
data = data[, -c(1:5)] # delete columns 1 through 3
data = data[, -c(21:29)] # delete columns 1 through 3

data$visitDuration = data$visitDuration / 1000
data$visitDurationLog10 = log10(data$visitDuration)
data$visitDurationLog = log(data$visitDuration)

## REMOVE OUTLIERS (mean + 2 SD = 3.3)
#data = subset(data, visitDuration <= mean(data$visitDuration) + 3.29*sd(data$visitDuration))

qqnorm(data$visitDurationLog, pch=19)
qqline(data$visitDurationLog)

pByExperimentTime = c("12", "05", "15", "03", "04", "08", "17", "06", "16", "07", "09", "01", "20", "18", "02", "10", "14", "19", "13", "11")

for (num in pByExperimentTime) {
  print(num)
  d = subset(data, pipefitter == paste('Pipefitter ', num, sep=""))
  #d = data[which(data$pipefitter == paste('Pipefitter ', num, sep="")),]
  assign(paste("p", num, sep=""), d)
  plot(d$visitTimestamp, d$visitDuration)
  #lines(d$visitTimestamp, d$visitDuration)
  
  #Sys.sleep(3)
}

rm(d)
rm(i)


### VISIT DURATION DISTRIBUTION FOR ALL PIPEFITTERS

ggplot(data, aes(x=visitDuration)) +
  geom_histogram(col="white", fill="black", position = "identity") +
  xlim(c(0,20)) +
  ylab("Density") +
  xlab("Visit Duration (s)")


### BEST AND WORST PERFORMERS (PIPEFITTERS 11 AND 12)

pData = subset(data, 
               pipefitter == 'Pipefitter 11' 
               | pipefitter == 'Pipefitter 12'
               )

pData$Pipefitter = pData$pipefitter

ggplot(pData, aes(x=visitDurationLog10, fill=pipefitter)) +
  geom_density(alpha = 0.2) +
  #xlim(c(0,10)) +
  ylab("Density") +
  xlab("Visit Duration (seconds, Log-10 Transformed)") + 
  #scale_fill_discrete(name = "Pipefitter")
  theme(legend.title = element_blank())
