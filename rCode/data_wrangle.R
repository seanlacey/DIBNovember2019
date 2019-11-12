library(tidyverse)
library(jsonlite)

comps1 <- as_tibble(read.delim("C:/projects/DIB NOV2019/WCA_export_Competitions.tsv",
                               sep="\t",encoding="UTF-8",stringsAsFactors=FALSE,quote="")) %>% 
  filter(countryId == "USA") %>% 
  select(id,name,cityName,countryId,year,month,day,latitude,longitude)

comp.vec <- comps1$id

results1 <- as_tibble(read.delim("C:/projects/DIB NOV2019/WCA_export_Results.tsv",
                                 sep="\t",encoding="UTF-8",stringsAsFactors=FALSE,quote="")) %>% 
  filter(competitionId %in% comp.vec & 
         eventId == 333 &
         roundTypeId %in% c("f","c") &
         pos == 1)

combo1 <- inner_join(results1,comps1,by=c("competitionId" = "id")) %>% 
  mutate(avgSeconds = average / 100,
         bestSeconds = best / 100) %>% 
  select(name,cityName,year,month,day,avgSeconds,bestSeconds,latitude,longitude) %>% 
  arrange(cityName,year,month,day)

combo2 <- combo1 %>% 
  separate(cityName,c("city","state"),sep=",") %>% 
  mutate(state=str_trim(state)) %>% 
  select(name,state,avgSeconds,bestSeconds)

average <- combo2 %>% 
  arrange(state,avgSeconds) %>% 
  group_by(state) %>% 
  mutate(pos=row_number()) %>% 
  slice(seq_len(3)) %>% 
  select(state,pos,avgName=name,avgSeconds)

best <- combo2 %>% 
  arrange(state,bestSeconds) %>% 
  group_by(state) %>% 
  mutate(pos=row_number()) %>% 
  slice(seq_len(3)) %>% 
  select(state,pos,bestName=name,bestSeconds)

finalCombo1 <- inner_join(average,best,by=c("state","pos"))

seconds <- finalCombo1 %>% 
  select(state,pos,avgSeconds,bestSeconds) %>% 
  gather("avgSeconds","bestSeconds",key=variable,value=seconds) %>% 
  mutate(variable = paste0(variable,pos)) %>% 
  select(-c(pos)) %>% 
  spread(variable,seconds)

name <- finalCombo1 %>% 
  select(state,pos,avgName,bestName) %>% 
  gather("avgName","bestName",key=variable,value=name) %>% 
  mutate(variable = paste0(variable,pos)) %>% 
  select(-c(pos)) %>% 
  spread(variable,name)

finalCombo2 <- inner_join(seconds,name,by=c("state"))

write_json(finalCombo2,"C:/projects/DIB NOV2019/us_avg_best.json",pretty=TRUE)

min(average$avgSeconds)
