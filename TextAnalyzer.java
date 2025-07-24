import java.util.Scanner;
public class TextAnalyzer{
public static void main(String[] args){
Scanner scanner=new Scanner(System.in);
System.out.println("Enter text (type 'END' on a new line to stop): ");
int characterCount = 0;
int wordCount=0;
int lineCount = 0;
while (true){
String line=scanner.nextLine();
if (line.equals("END")){
break;
}
lineCount++;
characterCount += line.length();
String[] words=line.split("\\s+");
wordCount += words.length;
}
System.out.println("Total Characters: "+ characterCount);
System.out.println("Total Words: " + wordCount);
System.out.println("Total Lines: " + lineCount);
}
}