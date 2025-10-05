import java.net.*;
import java.io.*;

public class Product {
  public static void main(String[] args) throws Exception {
    URL url = new URL("http://localhost:3001/api/product");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String inputLine;
    StringBuilder content = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
    }
    in.close();
    System.out.println("Product: " + content.toString());
  }
}