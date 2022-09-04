class Teams:
    def __init__(self, members):
        self.__myTeam = members

    def __len__(self):
        return len(self.__myTeam)

    def __contains__(self, member):
        if member in self.__myTeam:
            return True
        else:
            return False

    def __iter__(self):
        return iter(self.__myTeam)

###################################

def main():
  classmates = Teams(['John', 'Steve', 'Tim'])
  print (len(classmates))

  # checking implementation for the __contains__
  # protocol
  print("Tim" in classmates)
  print("Sam" in classmates)

  for m in classmates:
    print(m)  

main()
